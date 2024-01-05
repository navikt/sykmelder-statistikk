'use client'

import { SandboxIcon } from '@navikt/aksel-icons'
import { Button, Modal, Tooltip } from '@navikt/ds-react'
import React, { ReactElement, useRef, useState } from 'react'

import ReSeedDatabase from './tools/ReSeedDatabase'

function DevTools(): ReactElement {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [openState, setOpenState] = useState(false)

    return (
        <>
            <div className="fixed bottom-4 left-4" hidden={openState}>
                <Tooltip content="Verktøy for testing">
                    <Button
                        ref={buttonRef}
                        onClick={() => setOpenState((b) => !b)}
                        icon={<SandboxIcon title="Åpne testdataverktøy" />}
                        variant="tertiary-neutral"
                    />
                </Tooltip>
            </div>
            <Modal
                open={openState}
                onClose={() => {
                    setOpenState(false)
                }}
                header={{ heading: 'Testdataverktøy' }}
            >
                <Modal.Body>
                    <ReSeedDatabase />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setOpenState(false)}>
                        Lukk
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DevTools
