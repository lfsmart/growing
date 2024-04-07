/**
 * @author lantian
 * 处理 actions 
 */
export const handleActionType = (moduleName: string) => {
  moduleName = moduleName.toLocaleUpperCase();
  return (methods: string): string =>  moduleName + '/' + methods.toLocaleUpperCase()
}