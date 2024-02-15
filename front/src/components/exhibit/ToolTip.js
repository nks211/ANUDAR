import './ToolTip.css'

export default function ToolTip(props) {
  return (
    <span className="tooltipToggle" ariaLabel={props.ariaLabel} tabindex="0">
      <img src={"../../asset/"+props.img} width={props.size} height={props.size}/>
    </span>
  )
}