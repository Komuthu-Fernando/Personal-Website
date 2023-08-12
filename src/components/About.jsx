import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../style';
import { services } from '../constants';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

import { social } from '../constants';

const ServiceCard = ({ index, title, icon }) => (
	<Tilt className="xs:w-[250px] w-full">
		<motion.div
			variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
			className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
		>
			<div
				options={{
					max: 45,
					scale: 1,
					speed: 450,
				}}
				className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
			>
				<img
					src={icon}
					alt="web-development"
					className="w-16 h-16 object-contain"
				/>

				<h3 className="text-white text-[20px] font-bold text-center">
					{title}
				</h3>
			</div>
		</motion.div>
	</Tilt>
);

const About = () => {
	return (
		<>
			<motion.div variants={textVariant()}>
				<p className={styles.sectionSubText}>Introduction</p>
				<h2 className={styles.sectionHeadText}>Overview.</h2>
			</motion.div>

			<motion.p
				variants={fadeIn('', '', 0.1, 1)}
				className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
			>
				A cheerful and hard-working individual with a passion for technology and
				a knack for problem-solving. Embracing challenges with a positive
				mindset, I bring a unique perspective and a love for continuous
				learning. Determined, ambitious, and driven to make a meaningful impact
				in the world of technology, I thrive in dynamic environments and am
				ready to take on new opportunities.
			</motion.p>
			<motion.p
				variants={fadeIn('', '', 0.1, 1)}
				className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
			>
				<div className="flex flex-row flex-wrap gap-7 mt-4">
					{social.map((social) => (
						<div className="w-6 h-6" key={social.name}>
							<a href={social.link} target="_blank" rel="noopener noreferrer">
								<img
									src={social.icon}
									alt={social.name}
									className="transition-transform transform hover:scale-110"
								/>
							</a>
						</div>
					))}
				</div>
			</motion.p>
			<div className="mt-20 flex flex-wrap gap-10">
				{services.map((service, index) => (
					<ServiceCard key={service.title} index={index} {...service} />
				))}
			</div>
		</>
	);
};

export default SectionWrapper(About, 'about');
