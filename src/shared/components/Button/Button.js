import classes from './Button.module.css';

const Button = ({type = 'button', onClick = () => {}, children}) => {
  return (
    <button
      type={type}
      className={classes.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
