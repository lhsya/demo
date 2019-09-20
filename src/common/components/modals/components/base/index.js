import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
	constructor(props) {
		super(props);

		this.el = document.createElement('div');
		props.id && this.el.setAttribute('id', props.id);
		try{
			for(let n in props.styles){
				this.el.style.setProperty(n, props.styles[n]);
			}
		}catch(e){} 
	}

	componentDidMount() {
		if(this.props.stopBodyScroll){
			document.documentElement.style.setProperty('overflow', 'hidden');
			document.documentElement.style.setProperty('height', '100%');

			document.body.style.setProperty('overflow', 'hidden');
			document.body.style.setProperty('height', '100%');
		}
		
		if (this.props.insertWay === 'prepend') {
			document.body.insertBefore(this.el, document.body.firstChild);
			return;
		}
		document.body.appendChild(this.el);
	}

	componentWillUnmount() {
		if(this.props.stopBodyScroll){
			document.documentElement.style.setProperty('overflow', 'auto');
			document.documentElement.style.setProperty('height', 'auto');

			document.body.style.setProperty('overflow', 'auto');
			document.body.style.setProperty('height', 'auto');
		}
		this.el.remove();
	}

	render() {
		return ReactDOM.createPortal(this.props.children, this.el);
	}
}

export default Modal;


