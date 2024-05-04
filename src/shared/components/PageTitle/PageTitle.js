import classes from './PageTitle.module.css';

const PageTitle = ({ children }) => {
  return (
    <h1 className={classes['page_title']}>{children}</h1>
  );
}

export default PageTitle;