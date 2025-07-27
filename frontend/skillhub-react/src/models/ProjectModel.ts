class ProjectModel {
  id: number;
  title: string;
  description: string;
  skillsRequirements: string;
  postedBy: string;
  createdAt: string;
  userId: number;

  constructor(
    id: number,
    title: string,
    description: string,
    skillsRequirements: string,
    postedBy: string,
    createdAt: string,
    userId: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.skillsRequirements = skillsRequirements;
    this.createdAt = createdAt;
    this.postedBy = postedBy;
    this.userId = userId;
  }
}
export default ProjectModel;
