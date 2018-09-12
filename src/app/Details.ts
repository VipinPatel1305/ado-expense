export class Details{
	id: number;
	index: number;
	constructor(
	public description: string,
	public recipt_num: string,
	public amount: number,
	public updateamount: number,
	public trans_date: Date,
	public formonth: number,
	public foryear: number)
	{
	
	}
}

