export class FormatedTime {
  constructor(private time: number) {}

  public value(): string {
    const date = new Date(this.time);
    const dw = ['ВС', 'ПН','ВТ','СР','ЧТ','ПТ','СБ'][date.getDay()];
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const h = date.getHours();
    const min = date.getMinutes();
    
    const f = (v: number) => v >= 10 ? `${v}` : `0${v}`;
    
    return `${dw} · ${f(d)}.${f(m)} · ${f(h)}:${f(min)}`;
  }
}
