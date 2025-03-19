import {Button, ButtonProps} from "@/components/ui/button";

type propsType = ButtonProps & {
    pending?: boolean
}

const SubmitButton = ({children, pending, ...props}: propsType) => {


    return (
        <Button type="submit" aria-label={pending ? "Submitting..." : undefined} {...props}>
            {pending ? <span className="animate-pulse">Submitting...</span> : children}
        </Button>
    );
}
export default SubmitButton;