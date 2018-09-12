export class Cheque{
	id: number;
	settled: string;
	constructor(
	public purpose: string,
	public cheque_no: number,
	public amount: number,
	public date_issue: Date)
	{
	
	}
}

