import "../styles/ProjectHeader.css"

interface ProjectHeaderProps {
    name: string;
    desc: string;
}

function ProjectHeader({name, desc}: ProjectHeaderProps) {

    return (
        <div className="header-container">
            <div className="name">{name}</div>
            <div className="desc">{desc}</div>
        </div>
    )
}   

export default ProjectHeader