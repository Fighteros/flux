import {Button, ButtonProps} from "@/components/ui/button";
import {useFormState} from 'react-hook-form';

const SubmitButton = ({children, ...props}: ButtonProps) => {
    const { isSubmitting } = useFormState();


    return (
        <Button type="submit" aria-label={isSubmitting ? "Submitting..." : undefined} {...props}>
            {isSubmitting ? <span className="animate-pulse">Submitting...</span> : children}
        </Button>
    );
}
export default SubmitButton;