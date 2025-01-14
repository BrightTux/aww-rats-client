import React, { useContext, useMemo } from 'react';
import { ClosetItem } from '~/components/closet/ClosetItem';
import { ClosetContext } from '~/components/context/ClosetContext';
import { ClosetTokenWithMeta } from '~/types';

export const ClosetItemList = () => {
  const { loading, closetPieces, currentRat, sponsoredPieces, ownedItems } =
    useContext(ClosetContext);

  const piecesByType = useMemo(
    () =>
      Object.values(closetPieces).reduce((acc, curr) => {
        const pieceType = curr.tokenMeta.attributes.find(
          (a) => a.trait_type === 'Piece Type',
        )?.value;
        if (pieceType) {
          return {
            ...acc,
            [pieceType]: [...(acc[pieceType] ?? []), curr].sort((a) =>
              ownedItems[a.id.toString()] ? -1 : 0,
            ),
          };
        }
        return acc;
      }, {} as Record<string, ClosetTokenWithMeta[]>),
    [closetPieces, ownedItems],
  );

  return (
    <div>
      <div
        className={`flex flex-col w-full ${
          loading.pieces
            ? 'opacity-0 pointer-events-none overflow-hidden'
            : 'opacity-1 pointer-events-auto'
        }`}>
        {Object.values(sponsoredPieces).length > 0 && (
          <div>
            <h3 className='mt-4 mb-1 text-white bold capitalize text-xl'>
              Sponsored
            </h3>
            <p className='text-white text-sm'>
              These pieces are from some of our best friends around the
              internet.
            </p>
            <p className='text-white text-sm mb-4'>
              Want to{' '}
              <a
                href='https://docs.google.com/forms/d/e/1FAIpQLSf7Sya6kD5V-qGE9R7GIlZ6VC9_xR2EwsGo3VouvHcpCULCRg/viewform'
                target='_blank'
                className='underline'
                rel='noreferrer'>
                add a branded piece
              </a>{' '}
              to the closet?
            </p>

            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {Object.values(sponsoredPieces)
                .sort((a) => (ownedItems[a.id.toString()] ? -1 : 0))
                .map((piece) => (
                  <ClosetItem
                    key={piece.id.toString()}
                    piece={piece}
                    pieceType={
                      (piece.tokenMeta.attributes.find(
                        (a) => a.trait_type === 'Piece Type',
                      )?.value as string) ?? ''
                    }
                  />
                ))}
            </div>
          </div>
        )}
        {Object.entries(piecesByType).map(([pieceType, pieces]) => (
          <div key={pieceType}>
            <h3 className='mt-4 mb-1 text-white bold capitalize text-xl'>
              {pieceType}
            </h3>

            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {pieces.map((piece) => (
                <ClosetItem
                  key={piece.id.toString()}
                  piece={piece}
                  pieceType={pieceType}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
