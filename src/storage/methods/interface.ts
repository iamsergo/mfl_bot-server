export interface IMethod<MethodResultType> {
  execute(): Promise<MethodResultType>
}
