class SkillModel {
  id: number;
  title: string;
  level: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: number;

  constructor(
    id: number,
    title: string,
    level: string,
    description: string,
    created_at: string,
    updated_at: string,
    user_id: number
  ) {
    this.id = id;
    this.title = title;
    this.level = level;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user_id = user_id;
  }
}
export default SkillModel;
