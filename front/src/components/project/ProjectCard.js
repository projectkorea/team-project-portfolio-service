import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import ProjectList from "./ProjectList"

function ProjectCard({setIsEditing,projectList,isEditable}){


    return <Card >
    <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        {/* <ProjectList projectList={projectList} isEditable={isEditable}/> */}
          <button type="button" class="btn btn-primary" onClick={()=>setIsEditing(true)}>+</button>

    </Card.Body>
  </Card>
}

export default ProjectCard