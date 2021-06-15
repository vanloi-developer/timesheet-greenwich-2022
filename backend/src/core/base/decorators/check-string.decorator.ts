import { Type } from 'class-transformer';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
export function CheckString(require: boolean, min?: number, max?: number) {
	return function (target: any, propertyKey: string) {
		IsNotEmpty();
		MaxLength(max)(target, propertyKey);
		IsString()(target, propertyKey);
	};
}
