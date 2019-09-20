import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

const addImgPrefix = (src = '') => {
    src = src.replace(/http:\/\/www.lgstatic.com\/|https:\/\/www.lgstatic.com\/|https:\/\/www.lagou.com\/|http:\/\/www.lgstatic.com\/thumbnail_360x360\//gi, '');
    return `https://www.lgstatic.com/thumbnail_100x100/${src}`;
};

class Image extends Component {
    constructor(props){
        super(props);

        this.state ={ 
            image: props.isCompleteSrc ? props.src : addImgPrefix(props.src)
        }
    }
    refCallback = (e) => {
        const { defaultImage } = this.props;
        if(defaultImage){
            try{
                const errorHandler = (e) => {
                    this.setState({image: defaultImage});
                    e.removeEventListener && e.removeEventListener('error', errorHandler);
                };
                e.addEventListener('error', errorHandler);
            }catch(e){}
        }
    }
    render(){
        const props = {...this.props};
        try{
            delete props.src;
            delete props.defaultImage;
            delete props.isCompleteSrc;
        }catch(e){}
        return <img {...props} ref={this.refCallback} src={this.state.image} />
    }
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    defaultImage: PropTypes.string
};

export default Image;