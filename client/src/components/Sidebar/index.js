import { ListGroup } from "react-bootstrap";
import { IndeterminateCheckBox } from "@material-ui/icons";

const Sidebar = () => {
    const sampleUsers = ["bobby", "sally", "smarty head"];

    return (
        <ListGroup>
            {sampleUsers.map((contact, index) => {
                return (
                    <ListGroup.Item key={index}>
                        {contact}
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
};

export default Sidebar;