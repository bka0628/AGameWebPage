import classes from './InquiriesList.module.css';

const InquiriesList = ({ children }) => {
  return <ul className={classes['inquiries-list']}>{children}</ul>;
};

export default InquiriesList;