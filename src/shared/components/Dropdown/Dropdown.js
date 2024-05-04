import classes from './Dropdown.module.css';

const Dropdown = ({ children }) => {
  return (
    <>
      <div className={classes.dropdown}>
        <button className={classes.dropbtn}>Dropdown</button>
        <div className={classes.dropdownContent}>{children}</div>
      </div>
    </>
  );
};

export default Dropdown;
