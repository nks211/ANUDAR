package com.ssafy.anudar.S3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
@RequiredArgsConstructor
public class S3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.folder.folderName1}")
    private String userFolder;

    @Value("${cloud.aws.s3.folder.folderName2}")
    private String exhibitFolder;

    @Value("${cloud.aws.s3.folder.folderName3}")
    private String videoFolder;

    @Value("${cloud.aws.s3.folder.folderName4}")
    private String workFolder;

    private final AmazonS3 amazonS3;

    // 이미지 업로드
    public String uploadFile(MultipartFile file, FileFolder fileFolder) {
        //파일 이름 생성
        String fileName = getFileFolder(fileFolder) + createFileName(file.getOriginalFilename());

        //파일 변환
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());

        //파일 업로드
        try(InputStream inputStream = file.getInputStream()) {
            amazonS3.putObject(
                    new PutObjectRequest(bucket, fileName, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicReadWrite)
            );
        } catch (IOException e) {
            throw new IllegalArgumentException(String.format("파일 변환 중 에러가 발생하였습니다. (%s)", file.getOriginalFilename()));
        }

        return amazonS3.getUrl(bucket, fileName).toString();
    }

    // 동영상 업로드
    public String uploadVideo(String sesssionId, String filename) {
        String zipFilePath = File.separator + "mnt" + File.separator + "recordings" + File.separator + sesssionId + File.separator + sesssionId + ".zip";
        String extractDirPath = File.separator + "mnt" + File.separator + "recordings" + File.separator + sesssionId;
        String desiredFileName = filename + ".webm";

        if(amazonS3.doesObjectExist(bucket, getFileFolder(FileFolder.VIDEO) + desiredFileName)) { // 이미 영상이 있음
            return amazonS3.getUrl(bucket, getFileFolder(FileFolder.VIDEO) + desiredFileName).toString();
        }

        try {
            unzip(zipFilePath, extractDirPath);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        // Find desired file
        File desiredFile = new File(extractDirPath, desiredFileName);
        if (!desiredFile.exists()) {
            System.out.println("Desired file not found: " + desiredFileName);
            return null;
        }


        amazonS3.putObject(
                new PutObjectRequest(bucket, getFileFolder(FileFolder.VIDEO) + desiredFileName, desiredFile)
        );

        return amazonS3.getUrl(bucket, getFileFolder(FileFolder.VIDEO) + desiredFileName).toString();
    }

    // 파일 압축 풀기
    private static void unzip(String zipFilePath, String destDir) throws IOException {
        byte[] buffer = new byte[1024];
        try (ZipInputStream zis = new ZipInputStream(FileUtils.openInputStream(new File(zipFilePath)))) {
            ZipEntry zipEntry = zis.getNextEntry();
            while (zipEntry != null) {
                File newFile = newFile(destDir, zipEntry);
                if (zipEntry.isDirectory()) {
                    newFile.mkdirs();
                } else {
                    // write file content
                    try (FileOutputStream fos = new FileOutputStream(newFile)) {
                        int len;
                        while ((len = zis.read(buffer)) > 0) {
                            fos.write(buffer, 0, len);
                        }
                    }
                }
                zipEntry = zis.getNextEntry();
            }
        } catch ( Exception e) {
            throw new BadRequestException(ExceptionStatus.RECORD_NOT_FOUND);
        }
    }

    // 목표 파일 찾기
    private static File newFile(String destinationDir, ZipEntry zipEntry) throws IOException {
        File destFile = new File(destinationDir, zipEntry.getName());
        String destDirPath = destFile.getParent();
        if (destDirPath == null) {
            destDirPath = new File(destinationDir).getAbsolutePath();
        }
        File dir = new File(destDirPath);
        dir.mkdirs();
        destFile.createNewFile();
        return destFile;
    }


    //파일 이름 생성 로직
    private String createFileName(String originalFileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(originalFileName));
    }

    //파일의 확장자명을 가져오는 로직
    private String getFileExtension(String fileName){
        try{
            return fileName.substring(fileName.lastIndexOf("."));
        }catch(StringIndexOutOfBoundsException e) {
            throw new IllegalArgumentException(String.format("잘못된 형식의 파일 (%s) 입니다.",fileName));
        }
    }


    public String getFileFolder(FileFolder fileFolder) {

        String folder = "";
        if(fileFolder == FileFolder.USER_IMG) {
            folder = userFolder;
        } else if(fileFolder ==FileFolder.EXHIBIT_IMG){
            folder = exhibitFolder;
        } else if(fileFolder == FileFolder.VIDEO) {
            folder = videoFolder;
        } else if(fileFolder == FileFolder.WORK_IMG){
            folder = workFolder;
        }
        return folder;
    }

}