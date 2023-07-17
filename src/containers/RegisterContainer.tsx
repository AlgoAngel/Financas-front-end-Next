import React, { useState } from "react"
import RegisterArea from "../components/molecules/RegisterArea"
import { createUser } from "../api/users"
import Loading from "../components/molecules/Loading"
import useAuth from "@/hooks/useAuth"
import { Messages } from "@/utils/enum"

const RegisterContainer = () => {
	const [showButton, setShowButton] = useState(false)
	const [showLoading, setShowLoading] = useState(false)
	const [apiResponse, setApiResponse] = useState("")
	const [statusCode, setStatusCode] = useState(0)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [eyesIcon, setEyesIcon] = useState(false)
	const [type, setType] = useState("password")
	const { setAcessArea, setShowRegisterArea } = useAuth()

	const handleName = (value: string) => {
		setName(value)

		if (value != "" && password !== "" && validateEmail(email)) {
			setShowButton(true)
		} else {
			setShowButton(false)
		}
	}

	const handleEmail = (value: string) => {
		setEmail(value)

		if (password && name !== "" && validateEmail(value)) {
			setShowButton(true)
		} else {
			setShowButton(false)
		}
	}

	const handlePassword = (value: string) => {
		setPassword(value)

		if (value != "" && name !== "" && validateEmail(email)) {
			setShowButton(true)
		} else {
			setShowButton(false)
		}
	}

	const validateEmail = (email: string): boolean => {
		let regex = false

		if (email != "") regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)

		return regex
	}

	const handleApiResponse = (status: number) => {
		setStatusCode(status)

		if (status == 201) {
			setApiResponse(Messages.SUCCESS_IN_CREATING_USER)
			setName("")
			setEmail("")
			setPassword("")
		} else if (status == 409) {
			setApiResponse(Messages.EXISTING_USER)
		} else {
			setApiResponse(Messages.SERVER_ERROR)
		}
	}

	const createUsers = async () => {
		setShowLoading(true)
		setApiResponse("")

		const res: any = await createUser({ name, email, password })

		handleApiResponse(res.status)

		setShowLoading(false)
	}

	const showPassword = () => {
		setEyesIcon(!eyesIcon)

		if (type == "password") {
			setType("text")
		} else {
			setType("password")
		}
	}

	const closeRegisterArea = () => {
		setAcessArea(true)
		setShowRegisterArea(false)
		setShowButton(false)
	}

	return (
		<>
			{showLoading && <Loading />}

			<RegisterArea
				showButton={showButton}
				name={name}
				email={email}
				password={password}
				apiResponse={apiResponse}
				statusCode={statusCode}
				eyesIcon={eyesIcon}
				type={type}
				showPassword={showPassword}
				handleName={handleName}
				handleEmail={handleEmail}
				handlePassword={handlePassword}
				createUsers={createUsers}
				closeRegisterArea={closeRegisterArea}
			/>
		</>
	)
}

export default RegisterContainer