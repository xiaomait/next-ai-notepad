import { NextRequest, NextResponse } from 'next/server'
export const GET = () => {
	return NextResponse.json({
		code: 200,

		msg: 'Hello NEXT!',
	})
}
