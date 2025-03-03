import {
	NestInterceptor,
	ExecutionContext,
	Injectable,
	CallHandler
} from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

/**
 * @class TransformInterceptor class definition.
 *
 * TransformInterceptor is used to transform the response data from class into a plain JavaScript object.
 */

@Injectable()
export class TransformInterceptor implements NestInterceptor {
	/**
	 * Intercepts the response and transforms the data into a plain JavaScript object.
	 *
	 * @param context - The execution context of the request.
	 * @param next - The call handler to handle the next action in the request lifecycle.
	 * @returns An observable that emits the transformed data.
	 */
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(map((data) => instanceToPlain(data)))
	}
}
