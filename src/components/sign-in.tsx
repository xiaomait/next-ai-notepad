import { SignIn as SignInPage } from '@clerk/nextjs'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
export default function SignIn() {
	return (
		<Dialog>
			<DialogTrigger>
				<Button>Login</Button>
			</DialogTrigger>
			<DialogContent>
				<SignInPage />
			</DialogContent>
		</Dialog>
	)
}
