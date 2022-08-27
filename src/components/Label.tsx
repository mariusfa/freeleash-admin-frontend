interface Props {
    children: React.ReactNode;
    htmlFor: string;
}

export const Label: React.FC<Props> = ({ children, ...props }) => {
    return <label {...props}>{children}</label>;
};
