export class MockConfig implements LightDMConfig {
    
    get_str(section: string, key: string): string {
        throw new Error("Method not implemented.");
    }
    get_num(section: string, key: string): number {
        throw new Error("Method not implemented.");
    }
    get_bool(section: string, key: string): boolean {
        throw new Error("Method not implemented.");
    }

}