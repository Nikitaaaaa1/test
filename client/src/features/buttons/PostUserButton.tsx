
import { Button } from "@mui/material"
import { FC } from "react"

interface Props {
    enableToSave: boolean,
    postUser: ()=>void
}
const PostUserButton: FC<Props> = ({enableToSave, postUser}) => {
    return (
        <Button
            variant="contained"
            color="info"
            size="large"
            disabled={!enableToSave}
            onClick={postUser}
        >
            Wyślij
        </Button>
    )
}

export default PostUserButton