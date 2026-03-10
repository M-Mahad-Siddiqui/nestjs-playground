import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class myFirstPipes implements PipeTransform{
    transform(value: any, ...args: any[]): any {
        console.log('value: ', value);
        console.log('args: ', args);
        if (typeof value === 'string') {
            return value.toUpperCase();
        }
        if (typeof value === 'object' && value !== null) {
            return Object.fromEntries(
                Object.entries(value).map(([k, v]) => [k, typeof v === 'string' ? v.toUpperCase() : v])
            );
        }
        return value;
    }
}