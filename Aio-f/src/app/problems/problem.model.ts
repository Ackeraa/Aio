export class Problem {
  name: string;
  description: string;
  source: string;
  memory_limit: number;
  time_limit: number;
  input: string;
  output: string;
  samples: Array<any>;
  hint: string;
  tags: Array<string>;
  rule_type: string;
  is_visible: boolean;
  allowed_languages: Array<string>;

  constructor(obj?: any) {
    this.name = (obj && obj.name) || null;
    this.memory_limit = (obj && obj.memory_limit) || null;
    this.time_limit = (obj && obj.time_limit) || null;
    this.description = (obj && obj.description) || null;
    this.input = (obj && obj.input) || null;
    this.output = (obj && obj.output) || null;
    this.samples = (obj && obj.samples) || null;
    this.hint = (obj && obj.hint) || null;
    this.tags = (obj && obj.tags) || null;
    this.rule_type = (obj && obj.rule) || null;
    this.is_visible = (obj && obj.visible) || null;
    this.allowed_languages = (obj && obj.allowed_languages) || null;
  }
}
