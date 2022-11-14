function Modal(props:any) {
    return <div id="mymodal" className="modal">
        <span></span>
        <p className="name">{props.info}</p>
    </div>
}

export default Modal