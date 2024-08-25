const H = ({ children, onClick, className, style, ...props }) => {
  return (
    <h6 className={`${className} `} onClick={onClick} style={style} {...props}>
      {children}
    </h6>
  );
};

export const Title = ({ className, ...props }) => {
  return (
    <H className={` text-title text-4xl font-bold ${className}`} {...props} />
  );
};

export const SubTitle = ({ className, ...props }) => {
  return (
    <H
      className={` text-title text-2xl font-semibold ${className}`}
      {...props}
    />
  );
};

export const SubTitle2 = ({ className, ...props }) => {
  return (
    <H
      className={` text-title text-xl font-semibold ${className}`}
      {...props}
    />
  );
};

export const SubTitle3 = ({ className, ...props }) => {
  return (
    <H
      className={` text-title text-lg font-semibold ${className}`}
      {...props}
    />
  );
};

export const Label = ({ className, ...props }) => {
  return (
    <H
      className={` text-title text-sm font-semibold ${className}`}
      {...props}
    />
  );
};

export const Label2 = ({ className, ...props }) => {
  return (
    <H className={` text-text text-xs font-medium ${className}`} {...props} />
  );
};

export const Par = ({ children, onClick, className, style }) => {
  return (
    <p className={` text-text ${className}`} onClick={onClick} style={style}>
      {children}
    </p>
  );
};
