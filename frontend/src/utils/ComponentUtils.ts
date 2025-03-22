export class FormRules {
    static Required(msg?: string) {
        return { required: true, message: msg || '请输入' }
    }
}

