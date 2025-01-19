export class UpdatePseudo {
  static readonly type = '[User] Update Pseudo';
  constructor(public payload: string) {}
}
