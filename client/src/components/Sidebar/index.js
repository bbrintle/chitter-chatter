import { ListGroup } from "react-bootstrap";

const Sidebar = () => {
    const sampleUsers = ["bobby", "sally", "smarty head"];

    return (
        <ListGroup>
            {sampleUsers.map(contact => {
                return (
                    <ListGroup.Item>
                        {contact}
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
};

export default Sidebar;