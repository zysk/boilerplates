import xlsx from 'xlsx'

export const excelImportFromExcelFile = (file: any) => {
	const workbook = xlsx.read(file.buffer, { type: 'buffer' })
	const sheetName = workbook.SheetNames[0]
	const worksheet = workbook.Sheets[sheetName]
	const data = xlsx.utils.sheet_to_json(worksheet)
	return data
}
