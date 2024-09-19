import styles from './Button.module.scss';

interface ButtonProps {
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    children: React.ReactNode;
    onClick: () => void;
}

export const Button = ({
    type = 'button',
    variant = 'secondary',
    disabled = false,
    children,
    onClick,
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${styles[variant]}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
