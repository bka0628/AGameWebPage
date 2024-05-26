import classes from './Dropdown.module.css';

const Dropdown = ({ children, buttonName }) => {
  const 

  return (
    <>
      <div className={classes.dropdown}>
        <button className={classes.dropbtn}>
          Dropdown
          <span className="material-symbols-outlined">arrow_drop_down</span>
        </button>
        <div className={classes.dropdownContent}>{children}</div>
      </div>
    </>
  );
};

export default Dropdown;
