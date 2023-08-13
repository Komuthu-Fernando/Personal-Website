import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../style';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
	const formRef = useRef();
	const [form, setForm] = useState({
		name: '',
		email: '',
		message: '',
	});

	const [loading, setLoading] = useState(false);
	const [showThankYou, setShowThankYou] = useState(false);

	const handleCloseThankYou = () => {
		setShowThankYou(false);
	};

	const handleChange = (e) => {
		const { target } = e;
		const { name, value } = target;

		setForm({
			...form,
			[name]: value,
		});
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		message: Yup.string().required('Message is required'),
	});

	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setShowThankYou(true);
			resetForm();
		}, 2000);
		emailjs
			.send(
				import.meta.env.REACT_APP_EMAILJS_SERVICE_ID,
				import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID,
				{
					from_name: form.name,
					to_name: 'Komuthu Fernando',
					from_email: form.email,
					to_email: 'komuthuapsara@gmailcom',
					message: form.message,
				},
				import.meta.env.REACT_APP_EMAILJS_SERVER_KEY
			)
			.then(
				() => {
					setLoading(false);
					// alert('Thank you. I will get back to you as soon as possible.');
					setForm({
						name: '',
						email: '',
						message: '',
					});
				},
				(error) => {
					setLoading(false);
					console.error(error);
					alert('Ahh, something went wrong. Please try again.');
				}
			);
	};

	return (
		<div
			className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
		>
			<motion.div
				variants={slideIn('left', 'tween', 0.2, 1)}
				className="flex-[0.8] p-8 rounded-2xl"
			>
				<p className={styles.sectionSubText}>Get in touch</p>
				<h3 className={styles.sectionHeadText}>Contact.</h3>

				<Formik
					initialValues={{ name: '', email: '', message: '' }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					<Form>
						<label className="flex flex-col">
							<span className="text-white font-medium mb-2">Your Name</span>
							<Field
								type="text"
								name="name"
								placeholder="What's your name?"
								className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
							/>
							<ErrorMessage
								name="name"
								component="div"
								className="text-red-200"
							/>
						</label>

						<label className="flex flex-col">
							<span className="text-white font-medium mb-2 my-4">
								Your email
							</span>
							<Field
								type="email"
								name="email"
								placeholder="What's your email address?"
								className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
							/>
							<ErrorMessage
								name="email"
								component="div"
								className="text-red-200"
							/>
						</label>

						<label className="flex flex-col">
							<span className="text-white font-medium mb-2 my-4">
								Your Message
							</span>
							<Field
								as="textarea"
								name="message"
								placeholder="What you want to say?"
								className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
							/>
							<ErrorMessage
								name="message"
								component="div"
								className="text-red-200"
							/>
						</label>

						<button
							type="submit"
							className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary my-4"
							disabled={loading}
						>
							{loading ? 'Sending...' : 'Send'}
						</button>
					</Form>
				</Formik>
			</motion.div>

			<motion.div
				variants={slideIn('right', 'tween', 0.2, 1)}
				className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
			>
				<EarthCanvas />
			</motion.div>
			{showThankYou && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-70"
				>
					<div className="bg-white p-8 rounded-lg relative">
						<p className="text-gray-800 text-lg">
							Thank you. I will get back to you as soon as possible.
						</p>
						<button
							className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
							onClick={handleCloseThankYou}
						>
							<svg
								width="14"
								height="14"
								viewBox="0 0 18 18"
								fill="#FFF"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M10.4099 9L16.7099 2.71C16.8982 2.5217 17.004 2.2663 17.004 2C17.004 1.7337 16.8982 1.47831 16.7099 1.29C16.5216 1.1017 16.2662 0.995911 15.9999 0.995911C15.7336 0.995911 15.4782 1.1017 15.2899 1.29L8.99994 7.59L2.70994 1.29C2.52164 1.1017 2.26624 0.995911 1.99994 0.995911C1.73364 0.995911 1.47824 1.1017 1.28994 1.29C1.10164 1.47831 0.995847 1.7337 0.995847 2C0.995847 2.2663 1.10164 2.5217 1.28994 2.71L7.58994 9L1.28994 15.29C1.19621 15.383 1.12182 15.4936 1.07105 15.6154C1.02028 15.7373 0.994141 15.868 0.994141 16C0.994141 16.132 1.02028 16.2627 1.07105 16.3846C1.12182 16.5064 1.19621 16.617 1.28994 16.71C1.3829 16.8037 1.4935 16.8781 1.61536 16.9289C1.73722 16.9797 1.86793 17.0058 1.99994 17.0058C2.13195 17.0058 2.26266 16.9797 2.38452 16.9289C2.50638 16.8781 2.61698 16.8037 2.70994 16.71L8.99994 10.41L15.2899 16.71C15.3829 16.8037 15.4935 16.8781 15.6154 16.9289C15.7372 16.9797 15.8679 17.0058 15.9999 17.0058C16.132 17.0058 16.2627 16.9797 16.3845 16.9289C16.5064 16.8781 16.617 16.8037 16.7099 16.71C16.8037 16.617 16.8781 16.5064 16.9288 16.3846C16.9796 16.2627 17.0057 16.132 17.0057 16C17.0057 15.868 16.9796 15.7373 16.9288 15.6154C16.8781 15.4936 16.8037 15.383 16.7099 15.29L10.4099 9Z"
									fill="black"
								/>
							</svg>
						</button>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default SectionWrapper(Contact, 'contact');
