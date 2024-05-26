import classes from './NewsList.module.css';

const NewsList = ({ children }) => {
  return <ul className={classes['NewsList']}>{children}</ul>;
};

export default NewsList;

