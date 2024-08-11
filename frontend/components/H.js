const H = ({ children, onClick, className, style }) => {
  return (
    <h1 className={`${className} `} onClick={onClick} style={style}>
      {children}
    </h1>
  );
};

export const H1 = ({ className, ...props }) => {
  return <H className={`${className} text-text-h text-3xl`} {...props} />;
};

export const H2 = ({ className, ...props }) => {
  return <H className={`${className} text-text-h text-2xl`} {...props} />;
};

export const H3 = ({ className, ...props }) => {
  return <H className={`${className} text-text-h text-xl`} {...props} />;
};

export const H4 = ({ className, ...props }) => {
  return <H className={`${className} text-text-h text-base`} {...props} />;
};

export const H5 = ({ className, ...props }) => {
  return <H className={`${className} text-text-h text-sm`} {...props} />;
};

export const H6 = ({ className, ...props }) => {
  return <H className={`${className} text-text-h text-xs`} {...props} />;
};

export const Hi1 = ({ className, ...props }) => {
  return <H className={`${className} text-text-p text-2xl`} {...props} />;
};

export const Hi2 = ({ className, ...props }) => {
  return <H className={`${className} text-text-p text-xl`} {...props} />;
};

export const Hi3 = ({ className, ...props }) => {
  return <H className={`${className} text-text-p text-lg`} {...props} />;
};

export const Hi4 = ({ className, ...props }) => {
  return <H className={`${className} text-text-p text-base`} {...props} />;
};

export const Hi5 = ({ className, ...props }) => {
  return <H className={`${className} text-text-p text-sm`} {...props} />;
};

export const Hi6 = ({ className, ...props }) => {
  return <H className={`${className} text-text-p text-xs`} {...props} />;
};
