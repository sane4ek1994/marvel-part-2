import img from './error.gif';

const ErrorMessage = () => { // process.env.PUBLIC_URL + '/error.gif' используем файлы из public
    return (
        <img style={{
            display: 'block',
            width : '250px',
            height: '250px',
            objectFit: 'contain',
            margin: '0 auto'
        }} alt='Error-message' src={img} /> 
    )
} 

export default ErrorMessage;