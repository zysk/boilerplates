import { Injectable, Logger } from '@nestjs/common'
import dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc.default)
dayjs.extend(timezone.default)

@Injectable()
export class DateService {
	private logger = new Logger(DateService.name)

	/**
	 * Get current date in ISO format
	 * @returns ISO Date string
	 */
	public getCurrentDate(): string {
		return dayjs.tz().toISOString()
	}

	/**
	 * Get formatted current date (MM/DD/YYYY)
	 * @returns Formatted date string
	 */
	public getFormattedDate(): string {
		return dayjs.tz().format('MM/DD/YYYY')
	}

	/**
	 * Get formatted current date as YYYY-MM-DD
	 * @returns Date string in YYYY-MM-DD format
	 */
	public getCurrentDateString(): string {
		return dayjs.tz().format('YYYY-MM-DD')
	}

	/**
	 * Get current date as an epoch timestamp (milliseconds)
	 * @returns Epoch timestamp
	 */
	public getCurrentEpochDate(): number {
		return dayjs.tz().valueOf()
	}

	/**
	 * Convert an epoch timestamp to a formatted date in a given timezone
	 * @param epoch - Epoch timestamp (milliseconds)
	 * @param timezone - IANA timezone string
	 * @returns Formatted date string
	 */
	public convertEpochToDate(epoch: number, timezone: string): string {
		return dayjs.tz(epoch).tz(timezone).format('YYYY-MM-DDTHH:mm:ss')
	}

	/**
	 * Convert a date string to an epoch timestamp (milliseconds) in a given timezone
	 * @param date - Date string
	 * @param timezone - IANA timezone string
	 * @returns Epoch timestamp (milliseconds)
	 */
	public convertDateToEpoch(date: string, timezone: string): number {
		return dayjs.tz(date).tz(timezone).valueOf()
	}

	/**
	 * Check if a string is an epoch timestamp
	 * @param value - Input string
	 * @returns Boolean indicating if the string is a valid epoch timestamp
	 */
	public isEpoch(value: string): boolean {
		return /^\d+$/.test(value)
	}
}
