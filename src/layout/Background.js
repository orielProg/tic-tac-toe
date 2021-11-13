const Background = (props) => {
    return <div style = {{backgroundColor: 'orange',  width: '100vw',
    height: '100vh'}}>{props.children}</div>;
};

export default Background;