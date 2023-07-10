export class Problem {
	id: number;
	token: string;
	name: string;
	memory_limit: number;
	time_limit: number;
	description: string;
	input: string;
	output: string;
	samples: Array<any> ;
	hint: string;
	tags: Array<string>;
	rule: string;
	visible: boolean;
	allowed_languages: Array<string>;
	template: string;
	spj: string;
	data: string;

	constructor(obj?: any) {
		this.id = obj && obj.id || null;
		this.token = obj && obj.token || null;
		this.name = obj && obj.name || null;
		this.memory_limit = obj && obj.memory_limit || null;
		this.time_limit = obj && obj.time_limit || null;
		this.description = obj && obj.description || null;
		this.input = obj && obj.input || null;
		this.output = obj && obj.output || null;
		this.samples = obj && obj.samples || null;
		this.hint = obj && obj.hint || null;
		this.tags = obj && obj.tags || null;
		this.rule = obj && obj.rule || null;
		this.visible = obj && obj.visible || null;
		this.allowed_languages = obj && obj.allowed_languages || null;
		this.template = obj && obj.template || null;
		this.spj = obj && obj.spj || null;
		this.data = obj && obj.data || null;
	}
}
