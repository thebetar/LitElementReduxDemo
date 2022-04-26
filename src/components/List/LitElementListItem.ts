import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { store } from "../../store";
import { deleteBlogPost, setEditId } from "../../store/actions";
import { BlogPost } from "../App/LitElementApp";

@customElement("lit-element-list-item")
export class LitElementListItem extends LitElement {
	static styles = css`
		li {
			width: 80%;
			border: 1px #ccc solid;
			padding: 16px;
		}
		li:hover {
			background-color: #eee;
		}
		span {
			float: right;
			font-size: 18px;
			width: 24px;
			height: 24px;
			border-radius: 25%;
			text-align: center;
			cursor: pointer;
		}
		span:hover {
			background-color: #ccc;
		}
	`;

	@property({
		type: Object,
		attribute: "blog",
	})
	blog: BlogPost | null = null;

	connectedCallback(): void {
		super.connectedCallback();
		console.log(`Blog with id ${this.blog?.id} rendered`);
	}

	deleteBlog(id: number): void {
		store.dispatch(deleteBlogPost(id));
	}

	setEditId(id: number): void {
		store.dispatch(setEditId(id));
	}

	render() {
		return html`<li>
			<b>${this.blog?.title}</b>
			<span @click="${() => this.deleteBlog(this.blog?.id || 0)}">
				❌
			</span>
			<span @click="${() => this.setEditId(this.blog?.id || 0)}">
				✏️
			</span>
			<p>${this.blog?.description}</p>
		</li>`;
	}
}
