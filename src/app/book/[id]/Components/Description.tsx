"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import * as Toggle from "@radix-ui/react-toggle";
import clsx from "clsx";
import { useState } from "react";

export default function Description({ description }: { description: string }) {
	const [toggle, setToggle] = useState(false);

	const descriptionMarkup = { __html: description };

	return (
		<div>
			<div
				className={clsx({
					"overflow-hidden line-clamp-6": !toggle,
				})}
			>
				<p dangerouslySetInnerHTML={descriptionMarkup}></p>
			</div>

			<Toggle.Root
				onPressedChange={setToggle}
				aria-label="Toggle Full Description"
				className="pb-3"
			>
				<span className="flex gap-1 items-center underline underline-offset-8">
					{toggle ? (
						<>
							show less
							<ChevronUpIcon className="h-4 w-4" />
						</>
					) : (
						<>
							show more
							<ChevronDownIcon className="h-4 w-4" />
						</>
					)}
				</span>
			</Toggle.Root>
		</div>
	);
}
