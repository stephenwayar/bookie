interface FooterProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Footer: React.FC<FooterProps> = ({ children, className, style }) => {
  return (
    <footer className={className} style={style}>
      {children}
    </footer>
  );
};

export default Footer