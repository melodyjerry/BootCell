import { createCell, component, mixin, watch, attribute, on } from 'web-cell';
import classNames from 'classnames';

export interface PaginationProps {
    current?: number;
    total?: number;
}

@component({
    tagName: 'page-box',
    renderTarget: 'children'
})
export class Pagination extends mixin<PaginationProps>() {
    @attribute
    @watch
    current = 1;

    @attribute
    @watch
    total = 1;

    @on('click', '.page-link')
    onClick(event: MouseEvent) {
        event.preventDefault();

        const current = (event.target as HTMLElement).textContent.trim();

        switch (current) {
            case '<':
                this.current--;
                break;
            case '>':
                this.current++;
                break;
            default:
                this.current = parseInt(current);
        }

        this.emit('change', this.current, { bubbles: true, composed: true });
    }

    render({ current, total }: PaginationProps) {
        const list = Array.from(Array(total), (_, index) => {
            ++index;

            return index === 1 || index === current || index === total
                ? index
                : index === 2 || index + 1 === total
                ? '...'
                : '';
        }).filter(Boolean);

        return (
            <ul className="pagination justify-content-center">
                <li
                    className={classNames(
                        'page-item',
                        current === 1 && 'disabled'
                    )}
                >
                    <a
                        className="page-link"
                        aria-disabled={(current === 1) + ''}
                    >
                        &lt;
                    </a>
                </li>
                {list.map(index => {
                    const ellipsis = index === '...';

                    return index !== current ? (
                        <li
                            className={classNames(
                                'page-item',
                                ellipsis && 'disabled'
                            )}
                        >
                            <a
                                className="page-link"
                                aria-disabled={ellipsis + ''}
                            >
                                {index}
                            </a>
                        </li>
                    ) : (
                        <li className="page-item active" aria-current="page">
                            <a className="page-link">
                                {index}{' '}
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                    );
                })}
                <li
                    className={classNames(
                        'page-item',
                        current === total && 'disabled'
                    )}
                >
                    <a
                        className="page-link"
                        aria-disabled={(current === total) + ''}
                    >
                        >
                    </a>
                </li>
            </ul>
        );
    }
}
