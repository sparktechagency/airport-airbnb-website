
interface IButtonProps {
  name?: React.ReactNode;
  children?: React.ReactNode;
  style: string;
}

const Heading : React.FC<IButtonProps> = ({name, style, children}) => {
    return  <h1 className={` ${style}`}>{name || children}</h1>
};

export default Heading;